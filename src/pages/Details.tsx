// import React, { useEffect, useState } from 'react';

// import { useLocation } from 'react-router-dom';

// import { styled } from 'styled-components';

// import { PokemonDetail, PokemonType } from '../models';

// export const DetailsPage: React.FC = () => {
//   const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
//     null,
//   );
//   const [type, setType] = useState<PokemonType | undefined>();
//   const location = useLocation();

//   useEffect(() => {
//     setType(pokemonDetails?.types[0].type.name);
//   }, [pokemonDetails]);

//   useEffect(() => {
//     setPokemonDetails(location.state.pokemonDetails);
//   }, []);

//   return (
//     <Container>
//       <DetailsCard>
//         <Header>
//           {/* cover */}
//           <Cover type={type || 'gray'}>
//             {/* image */}
//             <CoverImage src={`assets/background/${type}Bg.svg`}></CoverImage>
//             <Image
//               src={
//                 pokemonDetails?.sprites.other['official-artwork'].front_default
//               }
//             ></Image>
//             {/* Name */}
//             <Title>{pokemonDetails?.name}</Title>
//             <NumberHolder>
//               {/* id */}
//               <PokemonId type={type || 'gray'}>{pokemonDetails?.id}</PokemonId>
//             </NumberHolder>
//           </Cover>
//           <BelowCover>
//             {/* Ability */}
//             <AbilityHolder>
//               <Heading>Ability</Heading>
//               <ul>
//                 {pokemonDetails?.abilities.map((item) => (
//                   <ULItem key={item.ability.name}>{item.ability.name}</ULItem>
//                 ))}
//               </ul>
//             </AbilityHolder>
//             {/* Dimension */}
//             <DimensionContainer>
//               <DimensionHolder>
//                 <DimensionHeading>Height</DimensionHeading>
//                 <Dimension>{pokemonDetails?.height}</Dimension>
//               </DimensionHolder>
//               <DimensionHolder>
//                 <DimensionHeading>Weight</DimensionHeading>
//                 <Dimension>{pokemonDetails?.weight}</Dimension>
//               </DimensionHolder>
//             </DimensionContainer>
//           </BelowCover>
//         </Header>
//       </DetailsCard>
//     </Container>
//   );
// };

// //Styled Components
// const Container = styled.div`
//   width: 100vw;
//   min-height: 100vh;
//   background-color: ${(props) => props.theme.colors.background};
//   display: flex;
//   /* background-color: #fff; */
//   justify-content: center;
// `;
// const DetailsCard = styled.div`
//   width: 100%;
//   display: flex;
//   background-color: #fff;
//   flex-direction: column;
//   align-items: center;
//   /* padding-block: 3%; */
// `;

// const Header = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   /* background-color: red; */
// `;

// const Cover = styled.div<{ type: PokemonType }>`
//   background-color: gray;
//   width: 100%;
//   height: 250px;
//   border-radius: 0px 0px 200px 200px;
//   z-index: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   background-color: ${(props) => props.theme.pokemonType[props.type] || 'gray'};
// `;

// const CoverImage = styled.img`
//   width: 90%;
//   height: 90%;
//   position: absolute;
// `;

// const Title = styled.h1`
//   position: absolute;
//   font-size: 60px;
//   bottom: -28%;
//   right: 8%;
//   padding: 0;
//   margin: 0;
//   text-transform: capitalize;

//   font-family: 'Pokemon Solid', sans-serif;
// `;

// const Image = styled.img`
//   width: 310px;
//   position: absolute;
//   bottom: -40%;
//   /* left: -3%; */
//   filter: saturate(2);
// `;

// const NumberHolder = styled.div`
//   background-color: #ffffffcf;
//   width: 80px;
//   height: 80px;
//   margin: 0;
//   position: absolute;
//   left: 5%;
//   bottom: 35%;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const PokemonId = styled.h2<{ type: PokemonType }>`
//   font-size: 40px;
//   color: ${(props) => props.theme.pokemonType[props.type] || 'gray'};
// `;

// const BelowCover = styled.div`
//   display: flex;
// `;
// // Abilities
// const AbilityHolder = styled.div`
//   width: 35%;
//   z-index: 0;
//   border-radius: 30px 0px 50px 50px;
//   /* min-height: 0px; */
//   background-color: ${(props) => props.theme.colors.cardBGC};
//   padding-block: 90px 10px;
// `;

// const Heading = styled.h1`
//   /* background-color: gray; */
//   font-size: 35px;
//   text-align: center;
// `;

// const ULItem = styled.li`
//   margin-left: 10%;
//   margin-block: 5px;
//   /* text-align: ; */
// `;

// //Dimentions
// const DimensionContainer = styled.div`
//   /* background-color: red; */
//   display: flex;
//   flex: 1;
//   justify-content: space-evenly;
//   align-items: center;
//   padding-top: 50px;
// `;

// const DimensionHolder = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const DimensionHeading = styled.p`
//   /* color: green; */
//   text-align: center;
//   /* background-color: #fff; */
//   margin: 0;
// `;

// const Dimension = styled.h1`
//   color: green;
//   text-align: center;
//   /* background-color: #fff; */
//   margin: 0;
//   font-size: 50px;
// `;
export {};
