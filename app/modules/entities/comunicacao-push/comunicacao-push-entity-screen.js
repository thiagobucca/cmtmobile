import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import {Container, Content, Card, CardItem, Text} from 'native-base';
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { comunicacaoPushEntityDetailScreen, comunicacaoPushEntityEditScreen } from '../../../navigation/layouts'
import ComunicacaoPushActions from './comunicacao-push.reducer'
import styles from './comunicacao-push-entity-screen-style'
import AlertMessage from '../../../shared/components/alert-message/alert-message'

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
      loading: true,
      done: false,
      dataObjects: []
    }
  }

  navigationButtonPressed ({ buttonId }) {
    comunicacaoPushEntityEditScreen({ entityId: null })
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

  render () {
    return (
      <View style={styles.container} testID='comunicacaoPushScreen'>
<Container>
                <Content>
                    <Card>
                        <CardItem header style={styles.header}>
                            <Text>Mensagem de Boas Vindas</Text>
                        </CardItem>

                        <CardItem>
                            <Text>
                            Seja bem vindo ao CMT
                            </Text>
                        </CardItem>

                        <CardItem header>
                            <Text></Text>
                        </CardItem>
                   </Card>
                   <Card>
                        <CardItem header style={styles.header}>
                            <Text>Reuniao CMT</Text>
                        </CardItem>

                        <CardItem>
                            <Text>
                            Nao esqueca da primeira reuniao do CMT no dia 04/02/2019 na loja LUA.
                            </Text>
                        </CardItem>

                        <CardItem header>
                            <Text></Text>
                        </CardItem>
                   </Card>
                   <Card>
                        <CardItem header style={styles.header}>
                            <Text>	Bem vindo ao convenio do CMT</Text>
                        </CardItem>

                        <CardItem>
                            <Text>
                            Bem vindo ao convenio do CMT. Nao esqueca de registrar os cupons de suas compras nos estabelecimentos conveniados.
                            </Text>
                        </CardItem>

                        <CardItem header>
                            <Text></Text>
                        </CardItem>
                   </Card>
                </Content>
            </Container>

      </View>
    )
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
