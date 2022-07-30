import ElementUtil from "@pages/Content/utils/element";

type CommitInfo = { title: string; link: string; hash: string };

export default function getCommitElements(): HTMLElement[] {
  const prTimelineTitles: HTMLElement[] = getPRTimelineTitles();
  const prCommitInfos: CommitInfo[] = prTimelineTitles.map(getCommitInfo);
  const commitElements: HTMLElement[] = prCommitInfos.map(createCommitElement);

  return commitElements;
}

function createCommitElement(commentInfo: CommitInfo): HTMLElement {
  const commitElement = document.createElement("div");
  const spanElement = document.createElement("span");
  spanElement.textContent = commentInfo.title;

  const anchorElement = document.createElement("a");
  anchorElement.text = commentInfo.hash.slice(0, 7);
  anchorElement.href = commentInfo.link;

  commitElement.append(spanElement);
  commitElement.append(anchorElement);

  return commitElement;
}

function getCommitInfo(element: Element): CommitInfo {
  const commitTitle = element.textContent;
  const commitLink = "https://github.com" + element.getAttribute("href");
  const commitHash = commitLink.split("/").reverse()[0];

  const commit: CommitInfo = {
    title: commitTitle || "",
    link: commitLink,
    hash: commitHash,
  };

  return commit;
}

function getPRTimelineTitles(): HTMLElement[] {
  const prTimeLines = ElementUtil.arrayFrom(
    document.querySelectorAll('[data-test-selector="pr-timeline-commits-list"]')
  );
  const titles = prTimeLines
    .map((element) =>
      ElementUtil.arrayFrom(element.getElementsByClassName("markdown-title"))
    )
    .flat(1);

  return titles;
}
