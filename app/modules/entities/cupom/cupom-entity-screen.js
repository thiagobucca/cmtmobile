import React from 'react'
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native'
import { List, ListItem, SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { cupomEntityDetailScreen, cupomEntityEditScreen } from '../../../navigation/layouts'
import CupomActions from './cupom.reducer'
import LoginActions from '../../login/login.reducer'
import styles from './cupom-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import { Colors } from '../../../shared/themes';
import { TextInputMask } from 'react-native-masked-text'
import moment from 'moment';

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class CupomEntityScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)

    /* ***********************************************************
    * STEP 1
    * This is an array of objects with the properties you desire
    * Usually this should come from Redux mapStateToProps
    *************************************************************/
    this.state = {
      page: 0,
      sort: 'id,asc',
      size: 20,
      loading: true,
      done: false,
      dataObjects: []
    }
  }

  navigationButtonPressed ({ buttonId }) {
    cupomEntityEditScreen({ entityId: null })
  }
  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {
    return (
      <TouchableOpacity onPress={cupomEntityDetailScreen.bind(this, { entityId: item.id })}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/
  // Render a header?
  // renderHeader = () =>
  //   <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  // renderFooter = () =>
  //  <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

  // Show this when data is empty
  renderEmpty = () =>
    <AlertMessage title='No Cupoms Found' show={!this.props.fetching} />

  // renderSeparator = () =>
  //  <Text style={styles.label}> - ~~~~~ - </Text>

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  fetchCupoms = () => {
    //this.props.getAllCupoms({ page: this.state.page, sort: this.state.sort, size: this.state.size, usuario_id: id })
  }

  fetchCupomsbyId = (id) => {

  this.props.getCupomByUser({ page: this.state.page, sort: this.state.sort, size: this.state.size, usuario_id: id })

  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 15,
          borderColor: Colors.gray,
          borderWidth: 1,
          backgroundColor: Colors.silver
        }}
      />
    );
  };

  handleLoadMore = () => {
    if (this.state.done || this.props.fetching) {
      return
    }
    this.setState({
      page: this.state.page + 1,
      loading: true
    })
   // this.fetchCupomsbyId(this.props.account.id)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.cupomUser) {
      this.setState({
        done: newProps.cupomUser.length < this.state.size,
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.cupomUser] : newProps.cupomUser,
        loading: false
      })
    }
  }

  componentWillMount () {
     //this.fetchCupoms()
    if (this.props.account.id) {
      this.fetchCupomsbyId(this.props.account.id)
     // this.props.getCupom(this.props.data.entityId)
    } else {
      this.setState({formValue: { id: null }})
    }

  }

  render () {
    if (this.state.updating || this.state.fetching) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }else
    {
      return (
        <View style={styles.container} testID='cupomScreen'>
          <FlatList
            data={this.state.dataObjects}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                onPress={cupomEntityDetailScreen.bind(this, { entityId: item.id })}
                // title={`Data: ${item.data}`}
                subtitle={
                  <View style={styles.subtitleView}>
                    <TextInputMask type={'money'} options={{ precision: 2, separator: ',', delimiter: '.', unit: 'R$', suffixUnit: '' }} editable={false} value={item.valor} style={styles.dateText}>
                    </TextInputMask>
                     <Text style={styles.ratingText}>Data: {moment.utc(item.data).format("DD/MM/YYYY")}
                    </Text>
                    <Text style={styles.ratingText}>Número: {item.numero}</Text>
                  </View>
                }
                leftAvatar={{ source: { uri: item.foto } }}
                // avatar={{ uri: item.telefone }}
                containerStyle={{ borderBottomWidth: 0 }}
                chevronColor="gray"
                chevron
              />
            )}
            onEndReached={this.handleLoadMore}
            onEndThreshold={100}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      )
    }

  }
}

const mapStateToProps = (state) => {
   console.log("mapsprops",state)
  return {
    // ...redux state to props here
    //cupoms: state.cupoms.cupoms,
    account: state.account.account,
  //  cupoms: state.cupoms.cupoms,
    cupomUser: state.cupoms.cupomUser,
    fetching: state.cupoms.fetchingAll,
    error: state.cupoms.errorAll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   // getAllCupoms: (options) => dispatch(CupomActions.cupomAllRequest(options)),
    getCupomByUser: (id) => dispatch(CupomActions.cupomUserRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CupomEntityScreen)
