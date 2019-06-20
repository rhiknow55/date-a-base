import React, {Component} from 'react';



class PH extends React.Component {
    constructor() {
        super()
        this.state = {
            pH: 0
        }
    }

    componentDidMount() {
        // Load the feed contents

        this.retrievepH()
            .then(res => this.setState({
                // messages: res.postIds
                pH: res.pH

            }));

    }


    retrievepH = async () => {
        let url = '/retrieve_pH?userId=' + this.props.myUserId;
        const response = await fetch(url)
        const json = await response.json();

        if (response.status !== 200) {
            throw Error(json.messages)
        }


        return json;
    }


    render() {
        return (
            <div className="pH">
                {this.state.pH}
            </div>
        )
    }
}

export default PH