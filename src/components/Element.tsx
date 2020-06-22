import * as React from 'react'
import { SingleDescriber } from './types'

export interface ElementDescriberProps extends SingleDescriber {
}

const ElementDescriber: React.FC<ElementDescriberProps> = () => <div />

export default ElementDescriber
