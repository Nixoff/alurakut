import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations';

function ProfileSidebar(props) {
  // console.log(props)

  return (
    <Box >
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'nixoff';
  const favoritePeoples = [
    'juunegreiros',
    'omariosouto',
    'peas', 
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho'
  ]


  const usersFollowing = async() => {
    try {
      const response = await fetch('https://api.github.com/users/Nixoff/following')
      const r = response.json();
      console.log(r);
      console.log(r.map(user => user.login))

    } catch (e) {
      console.error(e);
    }
  };

  usersFollowing()


  function getUserFollowings() {
    fetch('https://api.github.com/users/Nixoff/following')
    .then((serverResponse) => {
        return serverResponse.json();
    })
    .then((convertedUsers) => {
        console.log(convertedUsers.map(user => user.login))
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() =>{
        console.log('Passou no teste!')
        let testando = convertedUsers.map(user => user.login);
    })
  
  }
  // getUserFollowings()

  console.log('testando')
  

    return (
      <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{  gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea" style={{  gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">
              Bem vindo(a) {githubUser}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        
        <div className="profileRelationsArea" style={{  gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
          Pessoas da comunidade ({favoritePeoples.length})
            </h2>

            <ul>
            {favoritePeoples.map((currentItem) => {
              return (
                <li>
                  <a href={`/users/${currentItem}`} key={currentItem}> 
                <img src={`https://github.com/${currentItem}.png`}/>
                <span>{currentItem}</span>
                </a>
                </li>
              )
            })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
    )
}