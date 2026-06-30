export const getBackLink = (path: string, previousPath?: string) => {
  switch (path) {
    case "/products":
      return "/";
    case "/compose":
      return previousPath == "/final" ? "/final" : "/products";
    case "/final":
      return "/products";
    default:
      return "/";
  }
};
