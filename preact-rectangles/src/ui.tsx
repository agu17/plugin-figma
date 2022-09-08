import {
  Button,
  Columns,
  Container,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import { CloseHandler, CreateRectanglesHandler } from './types'

function Plugin() {
  
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text muted>Buscar</Text>
      <VerticalSpace space="large" />
      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth >
          Hola
        </Button>
        <Button fullWidth secondary>
          Que tal
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)
