import React from 'react';
//import PropTypes from "prop-types";
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import samplefishes from '../sample-fishes';
import Fish from './Fish';
import base from "../base";
//Lifecycle methods from React 
//component did mount first second page is loaded 

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        //match: PropTypes.func
    };

    componentDidMount() {
        // sync state and firebase
        console.log("Firebase DB Mounted");
        const {params} = this.props.match; 
        //first reinstate our localstorage
        const localStorageRef =localStorage.getItem(params.storeId);
        if(localStorageRef) {
        console.log(JSON.parse(localStorageRef));
            this.setState({order: JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}/fishes` , { 
            context: this,
            state: 'fishes'
        });
    }

    componentWillUnmount () {
        console.log("Unmounting");
        base.removeBinding(this.ref);
    }

    componentDidUpdate() {
        console.log(this.state.order);
        // speicher order in localstorage
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
        console.log("it updated");
    }

    addFish = fish => {
    //Take a copy of existing state
    //this.state.fishes.push(fish)
        console.log("Adding a fish!");
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish; 
        this.setState({
         fishes: fishes
        })}

    updateFish = (key, updatedFish) => {
      // 1. take a copy of the current state
      const fishes = { ...this.state.fishes };
      // 2. Update that state
      fishes[key] = updatedFish;   
      // 3. set that to state
      this.setState({ fishes });
    }

    deleteFish = (key) => {
       const fishes = { ...this.state.fishes };
       fishes[key] = null;
       // null wegen firebase 
       this.setState({fishes});
    }
    
    loadSampleFishes = () =>  
    this.setState({fishes: samplefishes});

    addToOrder = key => {
        // 1. take a copy of state  ...
        const order = { ...this.state.order};
        // 2. Either add to order, or update the number in our order 
        order[key] = order[key] + 1 || 1 ; 
        // 3.. Call setstate to update our state object 
        this.setState ({ order }); 
    }

    deleteOrderItem = (key) => {
        const order = { ...this.state.order };
        order[key] > 1 ? order[key] = order[key] - 1 : delete order[key]; 
        
        // null wegen firebase 
        this.setState({order});
     }

render()  {
    return (
            <div className="catch-of-the-day">
                <div className="menu">
                <Header tagline="Fresh Seafood Market"/> 
                <ul className="fishes"> 
                {Object.keys(this.state.fishes).map( key => (
                <Fish key={key} index={key} details={this.state.fishes[key]}  addToOrder = {this.addToOrder} /> ))} 
                </ul>                
                </div>
               <Order fishes={this.state.fishes} order={this.state.order} deleteOrderItem={this.deleteOrderItem} /> 
               <Inventory   addFish={this.addFish} 
                            loadSampleFishes={this.loadSampleFishes} 
                            fishes={this.state.fishes}
                            updateFish={this.updateFish}
                            deleteFish={this.deleteFish}
                            storeId={this.props.match.params.storeId} /> 
            </div>
            );
    }
}

export default App; 