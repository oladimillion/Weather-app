import { compose } from "lodash/fp";
import { inject, observer } from "mobx-react";

export default compose(inject("appStore"), observer);
