import React from 'react';
import { Text } from '../../components/Text';
import { FlexBox } from '../../components/FlexBox';
import { Icon } from "../../components/Icon"
import { IWeatherStore } from "../../stores/types"
import { isEmptyValue } from '../../helpers';
import { 
  AppBar,
  ToolBar,
  Search, 
  SearchIconWrapper, 
  InputWrapper,
  StyledInput,
} from './styled';
import connect from "./connect"


type Props = {
  weatherStore: IWeatherStore;
  redirectToPath(p: string): void;
}

export const SearchAppBar = connect((props: Props) => {

  const { weatherStore, redirectToPath } = props
  const [value, setValue] = React.useState("")
  const handleChange = React.useCallback((e) => {
    e.persist()
    setValue(() => e.target.value)
  }, [value])

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault()
    const payload = value?.trim()
    if (!isEmptyValue(payload)) {
      redirectToPath("/search?city=" + payload)
      await weatherStore.searchCities(payload)
    }
  }, [value])

  return (
    <FlexBox flexGrow={1}>
      <AppBar>
        <ToolBar>
          <FlexBox
            as="div"
            flexGrow={1}
            display={['none', 'flex']}
          >
            <Text fontSize={4} as="p">Weather App</Text>
          </FlexBox>
          <Search 
            onSubmit={handleSubmit}
          >
            <SearchIconWrapper>
              <Icon icon="magnifying-glass" />
            </SearchIconWrapper>
            <InputWrapper>
              <StyledInput
                value={value}
                onChange={handleChange}
                placeholder="Enter City Name..."
              />
            </InputWrapper>
          </Search>
        </ToolBar>
      </AppBar>
    </FlexBox>
  );
})

