import React from 'react';
import H3Module from '../../Main/Texts/H3Module/H3Module'
import H4Module from '../../Main/Texts/H4Module/H4Module'

export default function Texts(props){
    return (
        <React.Fragment>
            <H3Module title={props.title} />
            <H4Module text={props.children} />
        </React.Fragment>
    )
}