import { DETAIL_CLASS_NAME } from "@pages/Content/constansts";

export default function removeAlreadyCreatedDetail(
  targetElement?: HTMLElement
) {
  const details = targetElement?.getElementsByClassName(DETAIL_CLASS_NAME);
  if (!details) {
    return;
  }

  for (const detail of details) {
    detail.remove();
  }
}
