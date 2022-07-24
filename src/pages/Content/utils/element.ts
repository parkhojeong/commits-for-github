function arrayFrom(
  collectionOrNodeList: NodeList | HTMLCollectionOf<Element>
): HTMLElement[] {
  return Array.prototype.slice.call(collectionOrNodeList);
}

const ElementUtil = {
  arrayFrom,
};

export default ElementUtil;
