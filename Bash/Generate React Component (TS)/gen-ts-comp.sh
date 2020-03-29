args=("$@")

cat > ../src/components/${args[0]}.tsx << EOF 
import React, { Component } from 'react'

export interface ${args[0]}Props { }

export interface ${args[0]}State { }

export default class ${args[0]} extends Component<${args[0]}Props, ${args[0]}State> {
    constructor(props: ${args[0]}Props) {
        super(props)
        this.state = {

        }
    }

    render = (): React.ReactNode => {
        return (
            <div>
            
            </div>
        )
    }
} 
EOF