import React from 'react';
import PropTypes from "prop-types";

class AddFishForm extends React.Component {

constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.priceRef = React.createRef();
    this.statusRef = React.createRef();
    this.descRef = React.createRef();
    this.imageRef = React.createRef();
}
   static propTypes =  {
       addFish: PropTypes.func
   }
    createFish = (event) => {
        event.preventDefault();
        const fish = {
            name: this.nameRef.value.value, 
            price: parseFloat(this.priceRef.value.value), 
            status: this.statusRef.value.value, 
            desc: this.descRef.value.value, 
            image: this.imageRef.value.value, 
        }
        //console.log(fish);
        //referesh the form
        event.currentTarget.reset();
        this.props.addFish(fish);
    }
render()  {
    return (
        <form className="fish-edit" onSubmit={this.createFish}>
               <input name="name"  ref={this.nameRef} type="text" placeholder="Name"/>
                <input name="price"  ref={this.priceRef} type="text" placeholder="Price"/>
                <select name="status" ref={this.statusRef} >
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" ref={this.descRef}  placeholder="Desc"/>
                <input name="image" ref={this.imageRef}  type="text" placeholder="Image"/>  
                <button type="submit"> Add Fish</button>
            </form>
            );
    }
}

export default AddFishForm; 