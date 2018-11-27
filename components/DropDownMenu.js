import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import onClickOutside from "react-onclickoutside";
import '../styles/global.css';

class DropDownMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            listOpen: false,
            headerTitle: this.props.title
        }
    }

    handleClickOutside(e){
        this.setState({
            listOpen: false
        })
    }

    selectItem = (title, id, stateKey) => {
        this.setState({
            headerTitle: title,
            listOpen: false
        }, this.props.resetThenSet(id, stateKey))
    }

    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    render(){
        //TODO, list turns into an object when inserted objects, something we don't want
        console.log("list", this.props.list);
        return(
            <div className="dd-wrapper">
                <div className="dd-header" onClick={this.toggleList}>
                    <div className="dd-header-title">{this.state.headerTitle}</div>
                    {this.state.listOpen
                        ? <FontAwesome name="angle-up" size="2x"/>
                        : <FontAwesome name="angle-down" size="2x"/>
                    }
                </div>
                {this.state.listOpen && <ul className="dd-list">
                    {this.props.list.map((item)=> {
                        return <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
                    }
                    )}
                </ul>
                }
            </div>
        )
    }
}

export default onClickOutside(DropDownMenu);