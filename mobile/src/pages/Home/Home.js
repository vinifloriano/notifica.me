import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Cachorro Perdido',
      icon: 'dog',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Idoso',
      icon: 'blind',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Deficiente',
      icon: 'accessible-icon',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d454',
        title: 'Morador de Rua',
        icon: 'home',
    },
  ];
  
  function Item({ title, icon }) {
    return (
      <TouchableHighlight underlayColor='#aaa' style={styles.card} onPress={()=>{alert(title)}}>
        <>
            <FontAwesome5 style={styles.cardIcon} name={icon} size={30} color='#fff' />
            <Text style={styles.cardText}>{title}</Text>
        </>
      </TouchableHighlight>
    );
  }


function Main() {
    return(
        <View>
            <Text style={styles.title}>Eu vi um...</Text>
            <View style={styles.viewCards}>
            <SafeAreaView>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={DATA}
                    renderItem={({ item }) => <Item title={item.title} icon={item.icon} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            </View>
            <View style={styles.mainCard}>
                <TouchableHighlight  style={{borderBottomColor: '#999', borderBottomWidth: 1, marginBottom: 5}}>
                    <View>
                        <View>
                            <Text style={styles.mainCardTitle}>Vinicius Floriano</Text>
                            <View style={{flexDirection: "row", alignItems: "flex-end", justifyContent: "center"}}>
                                <Text style={styles.mainCardText}>Você ja ajudou um total de</Text><Text style={{fontSize: 35, marginBottom: 5}}> 17 </Text><Text  style={styles.mainCardText}>pessoas.</Text>
                            </View>
                        </View> 
                    </View>
                </TouchableHighlight>
                <TouchableHighlight>
                    <View>
                        <View>

                        </View> 
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginTop: 15,
        marginLeft: 12,
        fontSize: 16,
        color: '#df4441'
    },
    viewCards: {
        flexDirection: 'row',
        margin: 5
    },
    card: {
        height: 100,
        width: 100,
        borderRadius: 5,
        backgroundColor: "#ff6461",
        flexDirection: 'column',
        margin: 5
    },
    cardIcon: {
        marginTop: 10,
        textAlign: "center",
        flex: 1,
    },
    cardText: {
        color: "#FFF",
        margin: 2,
        textAlign: "center",
        flex: 1,
    },
    mainCard: {
        flexDirection: 'column',
        margin: 10,
        borderRadius: 5,
        padding: 20,
        backgroundColor: "rgba(100, 39, 38, 0.3)",
        height: 300, 
        marginTop: 20,
    },
    mainCardTitle: {
        fontSize: 22,
        color: "#df4441",
    },
    mainCardText: {
        marginBottom: 10,
        color: "#444"
    }
});

export default Main;