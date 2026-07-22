function negate(distance: number | string): number | string {
  return typeof distance === "string" ? `-${distance}` : -distance;
}

export { negate };
