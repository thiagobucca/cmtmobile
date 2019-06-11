import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert, Image, TouchableOpacity } from "react-native";
import { Badge, Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { categoriaEstabelecimentoEntityDetailScreen, categoriaEstabelecimentoEntityEditScreen, estabelecimentoComercialEntityScreen } from '../../../navigation/layouts'
import CategoriaEstabelecimentoActions from './categoria-estabelecimento.reducer'
import styles from './categoria-estabelecimento-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'
//import estabelecimentoComercialEntityScreen from "../estabelecimento-comercial/estabelecimento-comercial-entity-screen";

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

class CategoriaEstabelecimentoEntityScreen extends React.PureComponent {
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
      size: 1000,
      loading: true,
      done: false,
      dataObjects: [],
      GridListItems: [
        { key: "Skptricks" },
        { key: "Sumit" },
        { key: "Amit" },
        { key: "React" },
        { key: "React Native" },
        { key: "Java" },
        { key: "Javascript" },
        { key: "PHP" },
        { key: "AJAX" },
        { key: "Android" },
        { key: "Selenium" },
        { key: "HTML" },
        { key: "Database" },
        { key: "MYSQL" },
        { key: "SQLLite" },
        { key: "Web Technology" },
        { key: "CSS" },
        { key: "Python" },
        { key: "Linux" },
        { key: "Kotlin" },
      ]
    }
  }

  navigationButtonPressed ({ buttonId }) {
    categoriaEstabelecimentoEntityEditScreen({ entityId: null })
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
      <TouchableWithoutFeedback onPress={categoriaEstabelecimentoEntityDetailScreen.bind(this, { entityId: item.id })}>
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableWithoutFeedback>
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
    <AlertMessage title='No CategoriaEstabelecimentos Found' show={!this.props.fetching} />

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

  fetchCategoriaEstabelecimentos = () => {
    this.props.getAllCategoriaEstabelecimentos({ page: this.state.page, sort: this.state.sort, size: this.state.size })
  }

  handleLoadMore = () => {
    if (this.state.done || this.props.fetching) {
      return
    }
    this.setState({
      page: this.state.page + 1,
      loading: true
    })
    this.fetchCategoriaEstabelecimentos()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.categoriaEstabelecimentos) {
      this.setState({
        done: newProps.categoriaEstabelecimentos.length < this.state.size,
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.categoriaEstabelecimentos] : newProps.categoriaEstabelecimentos,
        loading: false
      })
    }
  }

  componentWillMount () {
    this.fetchCategoriaEstabelecimentos()
  }

  GetGridViewItem(item) {
    Alert.alert(item);
  }

  // render () {
  //   return (
  //     <View style={styles.container} testID='categoriaEstabelecimentoScreen'>
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
  render ()
  {
     console.log("props",this.props)
     console.log("state",this.state)
    return (
      <View style={styles.container}>
        <FlatList
           data={ this.props.categoriaEstabelecimentos }
           numColumns={2}
           renderItem={ ({item}) =>
           <TouchableOpacity style={styles.GridViewContainer} onPress={estabelecimentoComercialEntityScreen.bind(this, { entityId: item.id})}>
             <View >
             <Icon
  name='store' color='#154553' />
              <Text style={styles.GridViewTextLayout} onPress={estabelecimentoComercialEntityScreen.bind(this, { entityId: item.id})} > {item.nome} </Text>
              <Badge value={item.estabelecimentos} status="error" />
             </View></TouchableOpacity> }

        />
      </View>
   );
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    categoriaEstabelecimentos: state.categoriaEstabelecimentos.categoriaEstabelecimentos,
    fetching: state.categoriaEstabelecimentos.fetchingAll,
    error: state.categoriaEstabelecimentos.errorAll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategoriaEstabelecimentos: (options) => dispatch(CategoriaEstabelecimentoActions.categoriaEstabelecimentoAllRequest(options))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaEstabelecimentoEntityScreen)
