import { Card, Text, View } from "tamagui";
import { StyleSheet } from "react-native";
import { ICard, INotOwnedCard } from "../../../models/Card";
import { CardModal } from "../CardModal";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Logs } from "expo";
import { BORDER_RADIUS, colors } from "../../../globalConstants";

interface ICardProps {
  card: ICard;
  collectionName: string;
  addCard: (newCard: ICard) => void;
}

export const CardComponent = ({
  card,
  collectionName,
  addCard,
}: ICardProps) => {
  Logs.enableExpoCliLogging();

  const isCardOwned = !!card.owned_id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const styles = generateStyles(isCardOwned);

  const handlePress = () => {
    setIsModalOpen(true);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        {card.duplicates > 0 && (
          <View style={styles.duplicatesCircle}>
            <Text fontSize={12}>{card.duplicates}</Text>
          </View>
        )}
        <Text style={styles.cardNumber}>{card.card_number}</Text>
        <CardModal
          isVisible={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          card={card}
          collectionName={collectionName}
          addCard={addCard}
        />
      </View>
    </TouchableOpacity>
  );
};

const generateStyles = (isOwned?: boolean) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: isOwned ? colors.green : colors.red,
      alignItems: "center",
      justifyContent: "center",
      margin: 5,
      borderRadius: BORDER_RADIUS,
      height: 60,
      width: 60,
    },
    collectionName: {
      backgroundColor: colors.gray,
      fontWeight: "bold",
      margin: 20,
    },
    cardNumber: {
      fontWeight: "bold",
      fontSize: 20,
    },
    duplicatesCircle: {
      position: "absolute",
      top: 3,
      right: 3,
      backgroundColor: colors.yellow,
      borderRadius: 75,
      height: 18,
      width: 18,
      alignItems: "center",
      justifyContent: "center",
    },
  });
