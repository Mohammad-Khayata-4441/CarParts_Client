import React, { PropsWithChildren } from 'react'
import Login from '../../features/auth/login.view'
const FullScreen = (props: PropsWithChildren) => {
    return (
        <div>{props.children}</div>
    )
}

export default FullScreen