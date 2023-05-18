import {
  useURLforDT,
  useURLforLIB,
  useWorkbenchLinkValues,
  cleanURL,
  getURLbasename,
  getGitlabGroup,
  getGitlabURL,
} from 'util/envUtil';
import { renderHook } from '@testing-library/react';
import { wrapWithInitialState } from '../testUtils';

jest.unmock('util/envUtil');

describe('envUtil', () => {
  const testDT = 'testDT';
  const testLIB = '';
  const testAppURL = 'https://example.com';
  const testBasename = 'testBasename';
  const testGitlabURL = 'testGitlabURL';
  const testGitlabGroup = 'testGitlabGroup';
  const testWorkbenchEndpoints = [
    'one',
    '/two',
    'three/',
    '/four/',
    '/five/guy/',
  ];
  const testUsername = 'username';

  window.env = {
    REACT_APP_ENVIRONMENT: 'test',
    REACT_APP_URL: testAppURL,
    REACT_APP_URL_BASENAME: testBasename,
    REACT_APP_URL_DTLINK: testDT,
    REACT_APP_URL_LIBLINK: testLIB,
    REACT_APP_WORKBENCHLINK_TERMINAL: testWorkbenchEndpoints[0],
    REACT_APP_WORKBENCHLINK_VNCDESKTOP: testWorkbenchEndpoints[1],
    REACT_APP_WORKBENCHLINK_VSCODE: testWorkbenchEndpoints[2],
    REACT_APP_WORKBENCHLINK_JUPYTERLAB: testWorkbenchEndpoints[3],
    REACT_APP_WORKBENCHLINK_JUPYTERNOTEBOOK: testWorkbenchEndpoints[4],
    REACT_APP_BACKEND_URL_GITLAB: testGitlabURL,
    REACT_APP_BACKEND_GITLAB_GROUP: testGitlabGroup,
  };

  const renderWithUsername = wrapWithInitialState({
    auth: {
      userName: testUsername,
    },
  });

  test('useURL should return the correct enviroment variables', () => {
    const { result: resultURLdt } = renderHook(() => useURLforDT(), {
      wrapper: renderWithUsername,
    });
    expect(resultURLdt.current).toBe(
      `${testAppURL}/${testBasename}/${testUsername}/${testDT}`
    );

    const { result: resultURLlib } = renderHook(() => useURLforLIB(), {
      wrapper: renderWithUsername,
    });
    expect(resultURLlib.current).toBe(
      `${testAppURL}/${testBasename}/${testUsername}/${testLIB}`
    );

    const { result: resultURLbasename } = renderHook(() => getURLbasename(), {
      wrapper: renderWithUsername,
    });
    expect(resultURLbasename.current).toBe(testBasename);
  });

  test('GetGitlabGroup should return the correct enviroment variable', () => {
    expect(getGitlabGroup()).toBe(testGitlabGroup);
  });

  test('GetGitlabUrl should return the correct enviroment variable', () => {
    expect(getGitlabURL()).toBe(testGitlabURL);
  });

  test('useWorkbenchLinkValues should return an array', () => {
    const { result } = renderHook(() => useWorkbenchLinkValues(), {
      wrapper: renderWithUsername,
    });
    expect(Array.isArray(result.current)).toBe(true);
  });

  // Test that array elements have the expected shape
  test('useWorkbenchLinkValues should return an array of objects with "key" and "link" properties', () => {
    const { result } = renderHook(() => useWorkbenchLinkValues(), {
      wrapper: renderWithUsername,
    });
    expect(
      result.current.every(
        (el) => typeof el.key === 'string' && typeof el.link === 'string'
      )
    ).toBe(true);
  });

  // Test that the links are correctly constructed
  test('should construct the links correctly', () => {
    const { result } = renderHook(() => useWorkbenchLinkValues(), {
      wrapper: renderWithUsername,
    });
    result.current.forEach((el, i) => {
      expect(el.link).toEqual(
        `${testAppURL}/${testBasename}/${testUsername}/${cleanURL(
          testWorkbenchEndpoints[i]
        )}`
      );
    });
  });

  test('cleanURL should remove leading and trailing slashes', () => {
    expect(cleanURL('/test/')).toBe('test');
    expect(cleanURL('/test')).toBe('test');
    expect(cleanURL('test/')).toBe('test');
    expect(cleanURL('test')).toBe('test');
  });

  test('still handles if basename is set to empty string', () => {
    window.env.REACT_APP_URL_BASENAME = '';
    const { result: resLIB } = renderHook(() => useURLforLIB(), {
      wrapper: renderWithUsername,
    });
    expect(resLIB.current).toBe(`${testAppURL}/${testUsername}/${testLIB}`);
    const { result: resDT } = renderHook(() => useURLforDT(), {
      wrapper: renderWithUsername,
    });
    expect(resDT.current).toBe(`${testAppURL}/${testUsername}/${testDT}`);
    expect(getURLbasename()).toBe('');
  });
});
