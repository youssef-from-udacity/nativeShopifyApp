
import { connect } from 'react-redux'
import  SearchBox  from '../components/Search'



const mapStateToProps = (state, ownProps) => {
  return {
    defaultValue: ownProps.defaultValue
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onPressSearch: (text) => { ownProps.searchPressed(text) }
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox)

export default SearchContainer




