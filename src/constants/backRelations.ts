export const getBackLink = (path: string, previousPath?: string) => {
  console.log(path);
  console.log(previousPath);
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
