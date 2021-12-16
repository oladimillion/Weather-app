import React, { useState, useCallback, useEffect } from "react";
import { FlexBox } from "../../../components/FlexBox"
import { Pane } from "../../../components/Pane"
import { 
  TextArea,
  Button,
} from "./styled"

type Props = {
  handleSave: (note: string, position?: number) => void;
  handleCancel: (position?: number) => void;
  initialValue?: string;
  position?: number;
}

export const Editor = (props: Props) => {

  const { 
    handleSave, 
    handleCancel, 
    position, 
    initialValue,
  } = props

  const [note, setNote] = useState(initialValue || "")

  const onChange = useCallback((e) => {
    e.persist()
    setNote(e.target.value)
  }, [note])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    handleSave(note, position)
    handleCancel(position)
  }, [note, position])

  return (
    <FlexBox 
      as="form" 
      flexDirection="column" 
      onSubmit={handleSubmit}
      width="100%"
    >
      <TextArea 
        value={note}
        onChange={onChange}
        placeholder="Add a note"
        lineHeight={2}
      />
      <Pane mt={1}>
        <Button variant="primary" type="submit">Save</Button>
        <Button 
          onClick={() => handleCancel(position)} 
          ml={1} 
          variant="secondary"
        >
          Cancel
        </Button>
      </Pane>
    </FlexBox>
  )
}

