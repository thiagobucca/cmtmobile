import React from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { List, ListItem, SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { comunicacaoPushEntityDetailScreen, comunicacaoPushEntityEditScreen } from '../../../navigation/layouts'
import ComunicacaoPushActions from './comunicacao-push.reducer'
import styles from './comunicacao-push-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
import { Colors, Images } from '../../../shared/themes';

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class ComunicacaoPushEntityScreen extends React.PureComponent {
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
      done: false,
      dataObjects: [],
      loading: false,
      data: [],
      error: null,
      search: '',
    }
    lastTimeout = setTimeout;
    this.arrayholder = [];
  }

  navigationButtonPressed ({ buttonId }) {
    comunicacaoPushEntityEditScreen({ entityId: null })
  }

  componentDidMount() {
    this.arrayholder = this.props.comunicacaoPushes
    console.log("array",this.arrayholder)
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
      <TouchableOpacity onPress={comunicacaoPushEntityDetailScreen.bind(this, { entityId: item.id })}>
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
    <AlertMessage title='No ComunicacaoPushes Found' show={!this.props.fetching} />

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

  fetchComunicacaoPushes = () => {
    this.props.getAllComunicacaoPushes({ page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.state.done || this.props.fetching) {
      return
    }
    this.setState({
      page: this.state.page + 1,
      loading: true
    })
    this.fetchComunicacaoPushes()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.comunicacaoPushes) {
      this.setState({
        done: newProps.comunicacaoPushes.length < this.state.size,
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.comunicacaoPushes] : newProps.comunicacaoPushes,
        loading: false
      })
    }
  }

  componentWillMount () {
    this.fetchComunicacaoPushes()
  }

  componentWillUnmount() {

  }

  // render () {
  //   return (
  //     <View style={styles.container} testID='comunicacaoPushScreen'>
  //       <FlatList
  //         contentContainerStyle={styles.listContent}
  //         data={this.state.dataObjects}
  //         renderItem={this.renderRow}
  //         keyExtractor={this.keyExtractor}
  //         initialNumToRender={this.oneScreensWorth}
  //         onEndReached={this.handleLoadMore}
  //         onEndThreshold={100}
  //         /* ListHeaderComponent={this.renderHeader} */
  //         /* ListFooterComponent={this.renderFooter} */
  //         ListEmptyComponent={this.renderEmpty}
  //         ItemSeparatorComponent={this.renderSeparator}
  //       />
  //     </View>
  //   )
  // }

  updateSearch = search => {

    this.setState({ search });
    this.searchFilterFunction(search);
  };

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.headerText}>
      <Image source={Images.vazio} style={[styles.topLogo, this.state.topLogo]} />
      <Text style={[styles.emptyText]}> Não foram encontrados registros.</Text>
    </View>
    );
  };

  searchFilterFunction = text => {
    if(this.arrayholder != null && this.arrayholder.length > 0)
    {
      const newData = this.arrayholder.filter(item => {
        const itemData = `${item.titulo.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        dataObjects: newData,
      });
    }
  };

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

  handleQueryChange = query =>
  this.setState(state => ({ ...state, query: query || "" }));

  handleSearchCancel = () => this.handleQueryChange("");
  handleSearchClear = () => this.handleQueryChange(""); // maybe differentiate between cancel and clear

  render () {
    console.log(this.state,'push log')
    const { search } = this.state;
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }else
    {
      return (
        <View style={styles.container} testID='comunicacaoPushScreen'>
         <SearchBar inputStyle={{backgroundColor: 'white'}} inputContainerStyle={{backgroundColor: 'white'}}
      containerStyle={{backgroundColor: 'white'}} leftIconContainerStyle={{backgroundColor: 'white'}}
        placeholder="Pesquisar Notificação"
        onChangeText={this.updateSearch}
          //         onChangeText={ (text) => {
          //     clearTimeout(this.lastTimeout);
          //     this.lastTimeout = setTimeout(() => {this.searchFilterFunction(search)} ,1000)
          // } }
        value={search}
        lightTheme
        cancelButtonTitle='Cancelar'
        round
      />
          <FlatList
            data={this.state.dataObjects}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                // onPress={estabelecimentoComercialEntityDetailScreen.bind(this, { entityId: item.id })}
                title={`${item.titulo}`}
                subtitle={
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>{item.conteudoPush}</Text>
                    <Text style={styles.ratingText}>{item.subTitulo ? item.subTitulo : ""}</Text>
                  </View>
                }
                leftAvatar={{ source: { uri: "https://camo.githubusercontent.com/db9645b6605609aee21bd1472056fae607583f89/68747470733a2f2f636c6475702e636f6d2f556861626261304962642d3330303078333030302e706e67" } }}
                // avatar={{ uri: item.telefone }}
                containerStyle={{ borderBottomWidth: 0 }}
                // chevronColor="gray"
                // chevron
              />
            )}
            onEndReached={this.handleLoadMore}
            onEndThreshold={100}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            // ListEmptyComponent={this.ListEmpty}
          />
        </View>
      )
    }

  }


}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    comunicacaoPushes: state.comunicacaoPushes.comunicacaoPushes,
    fetching: state.comunicacaoPushes.fetchingAll,
    error: state.comunicacaoPushes.errorAll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllComunicacaoPushes: (options) => dispatch(ComunicacaoPushActions.comunicacaoPushAllRequest(options))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComunicacaoPushEntityScreen)
