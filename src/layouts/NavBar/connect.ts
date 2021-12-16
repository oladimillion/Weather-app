import { compose } from "lodash/fp";
import { inject, observer } from "mobx-react";
import { withCustomRouter } from "../../hoc"

export default compose(
  withCustomRouter,
  inject("navigationStore", "weatherStore"),
  observer,
);
