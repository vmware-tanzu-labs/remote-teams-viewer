/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

// Workaround for limitation in React Testing Library - https://github.com/testing-library/dom-testing-library/issues/410
export function textContentMatcher(text: string) {
  return function (_content: any, node: any) {
    const hasText = (node: any) => node.textContent === text;
    const nodeHasText = hasText(node);
    // eslint-disable-next-line testing-library/no-node-access
    const childrenDontHaveText = Array.from(node?.children || []).every((child) => !hasText(child));
    return nodeHasText && childrenDontHaveText;
  };
}
