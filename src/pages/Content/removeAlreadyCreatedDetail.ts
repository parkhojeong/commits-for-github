function removeElementFrom(targetElements: HTMLCollectionOf<Element>) {
  for (const targetElement of targetElements) {
    targetElement.remove();
  }
}
export default function removeAlreadyCreatedDetail(
  targetElement: HTMLElement,
  detailClassName: string
) {
  const details = targetElement?.getElementsByClassName(detailClassName);
  if (!details) {
    return;
  }

  removeElementFrom(details);
}
