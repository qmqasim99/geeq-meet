import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  collectionGroup,
  document,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

const groupMembers = [
  { user_id: 1, name: 'Frosty' },
  { user_id: 2, name: 'Toasty' },
  { user_id: 3, name: 'Boney' },
  { user_id: 4, name: 'Gusty' },
];
const SingleGroupPage = ({ navigation }) => {
  const [group, setGroup] = useState({});
  const [newFriend, setNewFriend] = useState('');
  const [searchedFriends, setSearchedFriends] = useState({});
  const usersRef = collection(db, 'users');

  //console.log(navigation);
  //const { group_id } = navigation.route.params;
  // console.log('group_id ', group_id);

  // const group_id = 4cXw12VSrQoKHmKsL1Di;

  // get a single doc
  const getSingleDoc = async () => {
    const docRef = doc(db, 'groups', '4cXw12VSrQoKHmKsL1Di');

    const gdocs = await getDoc(docRef);
    setGroup({ id: gdocs.id, ...gdocs.data() });

    console.log(' getSingleDoc ', gdocs.id, gdocs.data());
  };

  useEffect(() => {
    getSingleDoc();
    console.log('single group : ', group);
  }, []);

  // searches for friends by name
  const handleSubmitFriend = async (e) => {
    e.preventDefault();

    try {
      const q = query(
        usersRef,
        where('name', '==', newFriend)
        //,
        //orderBy('name')
      );

      const udocs = await getDocs(q);

      let users = [];

      udocs.docs.map((doc) => {
        users.push({ uid: doc.id, ...doc.data() });
      });
      console.log('in gettingDocs', users);
      setSearchedFriends(users);
    } catch (err) {
      console.log(err.message);
    }
  };

  // searches for friends by name
  const handleSubmitInvite = async (e) => {
    try {
      console.log('Friend invited with uid', e);
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderName = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const renderFriendName = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Button title="Invite" onPress={() => handleSubmitInvite(item.uid)} />
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 50,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
      }}
    >
      <Text>Group Name Here: {group.group_name}</Text>{' '}
      <Text>Group ID: {group.id}</Text>
      <Image
        source={{
          uri: 'https://www.clipartkey.com/mpngs/m/9-93815_daisy-flower-petals-yellow-cartoon-flower-png.png',
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text>Group Members</Text>
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Add new friend!"
          onChangeText={(newText) => setNewFriend(newText)}
          defaultValue={newFriend}
        />

        <Button title="Search" onPress={handleSubmitFriend} />
      </View>
      <Text>Users found:</Text>
      <FlatList
        data={searchedFriends}
        renderItem={renderFriendName}
        keyExtractor={(item) => item.uid}
      />
      <FlatList
        data={group.users}
        renderItem={renderName}
        keyExtractor={(item) => item.uid}
      />
      <FlatList
        data={groupMembers}
        renderItem={renderName}
        keyExtractor={(item) => item.user_id}
      />
      <View styles={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Chat"
          onPress={() => {
            navigation.navigate('Chat');
          }}
        />
        <Button
          title="Meet"
          onPress={() => {
            console.log('Meet Pressed');
          }}
        />
      </View>
    </View>
  );
};

export default SingleGroupPage;
