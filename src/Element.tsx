import * as React from 'react'
import { SingleDescriber } from './utils'

export interface ElementDescriberProps extends SingleDescriber {
}

const ElementDescriber: React.FC<ElementDescriberProps> = () => <div />

export default ElementDescriber
