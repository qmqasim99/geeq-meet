import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Link } from '@react-navigation/native';
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
  updateDoc,
  arrayUnion,
  orderBy,
  startAt,
  endAt,
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
  const docRef = doc(db, 'groups', '4cXw12VSrQoKHmKsL1Di');

  //console.log(navigation);
  // const { group_id } = navigation.getParams('group_id');
  // const group_id = navigation.useNavigationParam('group_id');
  // console.log('group_id ', group_id);

  // const group_id = 4cXw12VSrQoKHmKsL1Di;

  // get a single doc
  const getSingleDoc = async () => {
    const gdocs = await getDoc(docRef);
    setGroup({ id: gdocs.id, ...gdocs.data() });
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
        orderBy('name'),
        startAt(newFriend),
        endAt(newFriend + '\uf8ff')
        // where('name', '==', newFriend)
        //,
        //orderBy('name')
      );

      const udocs = await getDocs(q);

      let users = [];

      udocs.docs.map((doc) => {
        let invited = false;
        const currentInvites = doc.data().invites;
        console.log(' invitessss', doc.data());
        if (currentInvites) {
          currentInvites.map((invite) => {
            invite.group_id === group.id ? (invited = true) : (invited = false);
            console.log('already invited ', invited);
          });
        }
        users.push({ uid: doc.id, invited, ...doc.data() });
      });
      console.log('in gettingDocs', users);
      setSearchedFriends(users);
    } catch (err) {
      console.log(err.message);
    }
  };

  // searches for friends by name
  const handleSubmitInvite = async (inviteeName, inviteeUid) => {
    try {
      const newInvite = {
        invited_by: 'qname',
        invited_by_uid: auth.currentUser.uid,
        invitee: inviteeName,
        invitee_uid: inviteeUid,
        accepted: false,
      };

      // update group invite array with new invite
      updateDoc(docRef, { invites: arrayUnion(newInvite) });
      // add a new invite in users colleciton
      const newInviteForUsersCollection = {
        invited_by: 'qname',
        invited_by_uid: auth.currentUser.uid,
        group_name: group.group_name,
        group_id: group.id,
        accepted: false,
      };

      const usersDocRef = doc(db, 'users', inviteeUid);
      updateDoc(usersDocRef, {
        invites: arrayUnion(newInviteForUsersCollection),
      });

      console.log('Friend invited with uid', newInvite);
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
        <Button
          disabled={item.invited}
          title="Invite"
          onPress={() => handleSubmitInvite(item.name, item.uid)}
        />
      </View>
    );
  };

  // display current invitee list
  const renderInviteList = ({ item }) => {
    return (
      <View>
        <Text>{item.invitee}</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <Link
        to={{ screen: 'InviteTest', params: { uid: 'K5XmEen38Qx4LcTbY3nS' } }}
      >
        Test User Invite
      </Link>
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
      </View>
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Add new friend!"
          onChangeText={(newText) => setNewFriend(newText)}
          defaultValue={newFriend}
        />

        <Button title="Search" onPress={handleSubmitFriend} />
      </View>
      <View>
        <Text>Users found:</Text>
        <FlatList
          data={searchedFriends}
          renderItem={renderFriendName}
          keyExtractor={(item) => item.uid}
        />
      </View>
      <View>
        <Text>Friends invited:</Text>
        <FlatList
          data={group.invites}
          renderItem={renderInviteList}
          keyExtractor={(item) => item.invitee_uid}
        />
      </View>
      <View>
        <Text>Current friends:</Text>
        <FlatList
          data={group.users}
          renderItem={renderName}
          keyExtractor={(item) => item.uid}
        />
      </View>
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
    </ScrollView>
  );
};

export default SingleGroupPage;
