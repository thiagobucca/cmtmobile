import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { List, ListItem, SearchBar, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { estabelecimentoComercialEntityDetailScreen, estabelecimentoComercialEntityEditScreen } from '../../../navigation/layouts'
import EstabelecimentoComercialActions from './estabelecimento-comercial.reducer'
import styles from './estabelecimento-comercial-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class EstabelecimentoComercialEntityScreen extends React.Component {
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


  componentDidMount() {
    this.arrayholder = this.props.estabelecimentoComercials
  }

  makeRemoteRequest = () => {
    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });

      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.nome.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataObjects: newData,
    });
  };


  // renderHeader = () => {
  //   return (
  //     <View style={styles.searchContainer}>
  //           <SearchBar
  //       placeholder="Pesquisar Estabelecimento"
  //       platform={Platform.OS}
  //       cancelButtonTitle='Cancelar'
  //       // clearIcon={true}
  //       lightTheme
  //       round
  //       //   onChangeText={ (text) => {
  //       //     clearTimeout(this.lastTimeout);
  //       //     this.lastTimeout = setTimeout(() => {this.searchFilterFunction(text)} ,1000)
  //       // } }
  //       // autoCorrect={false}
  //     />
  //     </View>
  //   );
  // };

  // renderHeader = () => {
  //   const { search } = this.state;
  //   return (
  //     <SearchBar
  //     placeholder="Type Here..."
  //     onChangeText={this.updateSearch}
  //     value={search}
  //   />
  //   );
  // };

  updateSearch = search => {

    this.setState({ search });
    this.searchFilterFunction(search);
  };


  navigationButtonPressed ({ buttonId }) {
    estabelecimentoComercialEntityEditScreen({ entityId: null })
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
      <TouchableOpacity onPress={estabelecimentoComercialEntityDetailScreen.bind(this, { entityId: item.id })}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{item.id}</Text>
          <Text style={styles.label}>{item.nome}</Text>
          <Text style={styles.label}>{item.endereco}</Text>
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
    <AlertMessage title='Não foram encontrados Estabelecimentos.' show={!this.props.fetching} />

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

  fetchEstabelecimentoComercials = () => {
    this.props.getAllEstabelecimentoComercials({ page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.state.done || this.props.fetching) {
      return
    }
    this.setState({
      page: this.state.page + 1,
      loading: true
    })
    this.fetchEstabelecimentoComercials()
  }

  handleQueryChange = query =>
        this.setState(state => ({ ...state, query: query || "" }));

        handleSearchCancel = () => this.handleQueryChange("");
        handleSearchClear = () => this.handleQueryChange(""); // maybe differentiate between cancel and clear

  componentWillReceiveProps (newProps) {
    if (newProps.estabelecimentoComercials) {
      this.setState({
        done: newProps.estabelecimentoComercials.length < this.state.size,
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.estabelecimentoComercials] : newProps.estabelecimentoComercials,
        loading: false
      })
    }
  }

  componentWillMount () {
    this.fetchEstabelecimentoComercials()
  }

  render () {
    const { search } = this.state;
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container} testID='estabelecimentoComercialScreen'>
       <SearchBar
      placeholder="Pesquisar Estabelecimento"
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
              onPress={estabelecimentoComercialEntityDetailScreen.bind(this, { entityId: item.id })}
              title={`${item.nome}`}
              subtitle={
                <View style={styles.subtitleView}>
                  <Text style={styles.ratingText}>{item.endereco}</Text>
                  <Text style={styles.ratingText}>{item.telefone}</Text>
                </View>
              }
              leftAvatar={{ source: { uri: "http://www.siapec.agricultura.rj.gov.br/siapecest2/images/menu_acesso_externo_estabelecimento.jpg" } }}
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
        />
      </View>
    )
  }

  // render () {
  //   return (
  //     <View style={styles.container} testID='estabelecimentoComercialScreen'>
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
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    estabelecimentoComercials: state.estabelecimentoComercials.estabelecimentoComercials,
    fetching: state.estabelecimentoComercials.fetchingAll,
    error: state.estabelecimentoComercials.errorAll
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getAllEstabelecimentoComercials: (options) => dispatch(EstabelecimentoComercialActions.estabelecimentoComercialAllRequest(options))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EstabelecimentoComercialEntityScreen)
