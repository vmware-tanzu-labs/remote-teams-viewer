// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Fix GeoJSON rendering issue with Jest (fix listed below)
// https://github.com/Leaflet/Leaflet/issues/6297
// https://stackoverflow.com/questions/54382414/fixing-react-leaflet-testing-error-cannot-read-property-layeradd-of-null/54384719#54384719
const createElementNSOrig = global.document.createElementNS;
global.document.createElementNS = function (namespaceURI: string, qualifiedName: string): any {
  if (namespaceURI === "http://www.w3.org/2000/svg" && qualifiedName === "svg") {
    const element = createElementNSOrig.apply(this, arguments as any) as any;
    element.createSVGRect = function () {};
    return element;
  }
  return createElementNSOrig.apply(this, arguments as any);
};
