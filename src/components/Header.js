import React from 'react';

const Header = (props) => (
                <header className="top">
                    <h1>Catch 
                        <span className="ofThe">
                            <span className="of">Of</span> 
                            <span>the</span>
                            </span> 
                        Day</h1>
                    <h3 className="tagline">
                        <span>{props.tagline}</span>
                    </h3>
                </header>
                );

// Bei statischen´m Content braucht man nicht notwenidgerweise einen Component, sondern kann auch eine JS-Function verwenden. 
/* stateless functitonal component   
class Header extends React.Component {
render()  {
    return (
            <header className="top">
                <h1>Catch 
                    <span className="ofThe">
                        <span className="of">Of</span> 
                        <span>the</span>
                        </span> 
                    Day</h1>
                <h3 className="tagline">
                    <span>{this.props.tagline}</span>
                </h3>
            </header>
            );
    }
}*/

export default Header; 