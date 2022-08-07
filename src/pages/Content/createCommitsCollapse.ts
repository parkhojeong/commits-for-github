import { DETAIL_CLASS_NAME } from "@pages/Content/constansts";

export default function createCommitsCollapse(
  commitElements: HTMLElement[]
): HTMLDetailsElement {
  const detailsElement = document.createElement("details");
  detailsElement.classList.add(DETAIL_CLASS_NAME);
  const summaryElement = document.createElement("summary");
  summaryElement.textContent = "Commits";

  detailsElement.append(summaryElement);

  commitElements.forEach((commitElement) => {
    detailsElement.append(commitElement);
  });

  return detailsElement;
}
