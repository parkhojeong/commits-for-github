import select from "select-dom";

const detect = (targetElement: HTMLElement) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(() => {
      const finded = select("markdown-toolbar", targetElement);

      const CLASS = "appended-commits";

      if (!targetElement?.classList.contains(CLASS)) {
        targetElement?.classList.add(CLASS);
        finded?.appendChild(getCommitDetailsElement(getCommitElements()));
      }
    });
  });

  if (!targetElement) {
    return;
  }

  observer.observe(targetElement, {
    attributes: true,
    subtree: true,
  });
};

const detectTarget = select("details.review-thread-component");
if (detectTarget) {
  detect(detectTarget);
}

function addToolbarButton(appendElement: HTMLElement) {
  for (const toolbar of select.all("markdown-toolbar")) {
    toolbar.append(appendElement);
  }
}

addToolbarButton(getCommitDetailsElement(getCommitElements()));

function getCommitDetailsElement(
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

function getCommitElements(): HTMLElement[] {
  const data = getPrCommits();
  const commitElements = data.map((d) => {
    const wrapper = document.createElement("div");
    const spanElement = document.createElement("span");
    spanElement.textContent = d.text;

    const anchorElement = document.createElement("a");
    anchorElement.text = d.hash.slice(0, 7);
    anchorElement.href = d.link;

    wrapper.append(spanElement);
    wrapper.append(anchorElement);

    return wrapper;
  });

  return commitElements;
}

type Commit = { text: string; link: string; hash: string };

function getPrCommits(): Commit[] {
  const commits: Commit[] = [];

  const prTimelines = document.querySelectorAll(
    '[data-test-selector="pr-timeline-commits-list"]'
  );

  prTimelines.forEach((prTimeline) => {
    const titles = prTimeline.getElementsByClassName("markdown-title");
    for (const title of titles) {
      const commitText = title.textContent;
      const commitLink = "https://github.com" + title.getAttribute("href");
      const commitHash = commitLink.split("/").reverse()[0];

      const commit: Commit = {
        text: commitText || "",
        link: commitLink,
        hash: commitHash,
      };

      commits.push(commit);
    }
  });

  return commits;
}
