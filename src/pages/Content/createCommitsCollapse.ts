export default function createCommitsCollapse(
  commitElements: HTMLElement[]
): HTMLDetailsElement {
  const detailsElement = document.createElement("details");
  const summaryElement = document.createElement("summary");
  summaryElement.textContent = "Commits";

  detailsElement.append(summaryElement);

  commitElements.forEach((commitElement) => {
    detailsElement.append(commitElement);
  });

  return detailsElement;
}
