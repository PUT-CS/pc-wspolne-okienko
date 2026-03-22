import ICAL from "ical.js";

function getString(
  component: ICAL.Component,
  property: string,
): string | undefined {
  const value = component.getFirstPropertyValue(property);
  if (typeof value === "string") {
    return value;
  }
  return undefined;
}

function getDate(
  component: ICAL.Component,
  property: string,
): Date | undefined {
  const value = component.getFirstPropertyValue(property);
  if (value instanceof ICAL.Time) {
    return value.toJSDate();
  }
  return undefined;
}

export function componentAccessWrapper(component: ICAL.Component) {
  return {
    getString: (property: string) => getString(component, property),
    getDate: (property: string) => getDate(component, property),
  };
}
