import { Component } from "react";
import {
  MdFavoriteBorder,
  MdFavorite
} from 'react-icons/md';

class FavoriteProduct extends Component {
  state = { liked: false };
  toggle = () => {
    let localLiked = this.state.liked;
  
    // Toggle the state variable liked
    localLiked = !localLiked;
    this.setState({ liked: localLiked });
  };
  render() {
    return (
      <div
        className="container"
        onClick={() => this.toggle()}
      >
        {this.state.liked === false ? (
          <MdFavoriteBorder className="unchecked" size={18} />
        ) : (
          <MdFavorite className="checked" size={18} />
        )}
      </div>
    );
  }
}
  
export default FavoriteProduct;