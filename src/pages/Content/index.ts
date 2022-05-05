import observeEl from "@src/lib/simplified-element-observer";
import select from "select-dom";

// gifs-for-github's function
// https://github.com/N1ck/gifs-for-github/blob/c46828db015a783dec3d3209987b0eb56bcad457/src/main.js#L80
function addToolbarButton() {
  for (const toolbar of select.all(
    "form:not(.ghg-has-giphy-field) markdown-toolbar"
  )) {
    const form = toolbar.closest("form");
    const reviewChangesModal = toolbar.closest(
      "#review-changes-modal .SelectMenu-modal"
    );
    const reviewChangesList = toolbar.closest(
      "#review-changes-modal .SelectMenu-list"
    );

    // Add a specific class if the form is in the review changes modal, or if it is in the review changes list
    // Otherwise the GIF selection popover will not be visible.
    if (reviewChangesModal !== null) {
      reviewChangesModal.classList.add("ghg-in-review-changes-modal");
    }

    if (reviewChangesList !== null) {
      reviewChangesList.classList.add("ghg-in-review-changes-list");
    }

    // Observe the toolbars without the giphy field, add
    // the toolbar item to any new toolbars.
    observeEl(toolbar, () => {
      let toolbarGroup = select.all(
        '.toolbar-commenting > :not([class*="--hidden"]):not(button)',
        toolbar
      );
      toolbarGroup = toolbarGroup[toolbarGroup.length - 1];

      // TODO: change button to react component
      const button = document.createElement("button");
      button.textContent = "div~";
      button.type = "button";
      button.addEventListener("click", () => {
        console.log("clicked");
      });

      if (toolbarGroup) {
        // Append the Giphy button to the toolbar
        // cloneNode is necessary, without it, it will only be appended to the last toolbarGroup
        toolbarGroup.append(button);
        form.classList.add("ghg-has-giphy-field");
      }
    });
  }
}

addToolbarButton();

type Commit = { text: string; link: string; hash: string };
const getPrCommits = (): Commit[] => {
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
};
