import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false}
    }
    static getDerivedStateFromError(error) {
        return {hasError: true}
    }
    componentDidCatch(error, info) {

    }

    render() {
        return this.props.children
    }
}