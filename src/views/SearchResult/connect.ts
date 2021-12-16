import { observer } from "mobx-react";
import { compose } from "lodash/fp";
import { withWeather } from "../../hoc";

export default compose(withWeather, observer);
