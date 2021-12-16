import React from "react";
import { observer } from "mobx-react"
import { isEmptyValue } from "../../../helpers"
import { Card } from "../../../components/Card"
import { Text } from "../../../components/Text"
import { FlexBox } from "../../../components/FlexBox"
import { Icon } from "../../../components/Icon"
import { Button } from "../../../components/Button"
import { WeatherProps } from "../types"
import { Editor } from "./Editor"
import { List } from "./styled"

type State = {
  editorsState: Array<boolean>;
  showAddNote: boolean;
}

class NotesComponent extends React.Component<WeatherProps, State> {

  state = {
    editorsState: this.editorsToggle,
    showAddNote: false
  }

  get editorsToggle (): Array<boolean> {
    const { cityWeather } = this.props.weatherStore
    return new Array(cityWeather.notes.length).fill(false)
  }

  toggleEditor = (index?: number) => {

    // closing other editors and toggling the targeted one
    if (isEmptyValue(index)) return
    
    const { editorsState } = this.state
    const prevState = editorsState[index as number]
    editorsState.fill(false)
    editorsState[index as number] = !prevState
    this.setState({ editorsState, showAddNote: false, })
  }

  handleSave = (note: string, index?: number) => {
    const { updateNote, addNote } = this.props.weatherStore
    if (!isEmptyValue(index)) {
      updateNote(note, index as number)
    } else {
      addNote(note)
    }
  }

  toggleAddNote = () => {

    // closing other editors and toggling the add-note editor
    const { showAddNote, editorsState } = this.state
    editorsState.fill(false)
    this.setState({ editorsState, showAddNote: !showAddNote })
  }

  render() {
    const { cityWeather, removeNote } = this.props.weatherStore
    const { editorsState, showAddNote } = this.state

    return (
      <Card my={2}>
        <Card.Header>My Notes</Card.Header>
        <Card.Content>
          {isEmptyValue(cityWeather.notes) && (
            <Text color="grey.700">Kindly add some notes</Text>
          )}
          <List>
            {cityWeather.notes.map((note: string, index: number) => (
              <List.Item key={index}>
                {editorsState[index]
                  ? (
                    <Editor 
                      initialValue={note}
                      position={index}
                      handleSave={this.handleSave} 
                      handleCancel={this.toggleEditor} 
                    />
                  ) : (
                    <FlexBox width="100%">
                      <Text 
                        fontSize={1} 
                        color="grey.600" 
                        mr={2}
                        lineHeight={2}
                        whiteSpace="break-space"
                      >
                        {note}
                      </Text>
                      <FlexBox>
                        <Icon 
                          icon="edit" 
                          onClick={() => this.toggleEditor(index)} 
                        />
                        <Icon 
                          icon="trash" 
                          onClick={() => removeNote(index)}
                        />
                      </FlexBox>
                    </FlexBox>
                  )}
              </List.Item>
            ))}
          </List>
          {showAddNote ? (
            <Editor 
              handleSave={(note: string) => {
                this.handleSave(note)
                this.toggleAddNote()
              }} 
              handleCancel={this.toggleAddNote} 
            />
          ) : (
            <Button variant="secondary" onClick={this.toggleAddNote}>
              <Icon icon="add" />
            </Button>
          )}
        </Card.Content>
      </Card>
    )
  }
}


export const Notes = observer(NotesComponent)
