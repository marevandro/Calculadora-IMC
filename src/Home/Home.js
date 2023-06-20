import React, { useState, useEffect } from "react";
import {
  Container,
  Text,
  Input,
  Button,
  ButtonText,
  Icon,
  ResultText,
  TextWarning,
  DetailsText
} from "./HomeStyles";
import IMCMessages from "../IMCMessages";

export default function Home() {
  const [quilograma, setQuilograma] = useState('')
  const [altura, setAltura] = useState('')
  const [resultImc, setResultImc] = useState('')
  const [classification, setClassification] = useState("")
  const [showWeightWarning, setShowWeightWarning] = useState(false)
  const [showHeightWarning, setShowHeightWarning] = useState(false)
  const [shwoResult, setShowResult] = useState(false);

  const handleSubmit = () => {

    if(!quilograma || !altura){
      alert('Insira o peso e altura')
      return
    }

    if(quilograma > 999){
      setShowWeightWarning(true)
    }else if(altura > 299){
      setShowHeightWarning(true)
    }

    const heightMeters = altura / 100;
    const calculatedImc = quilograma / (heightMeters * heightMeters)

    if (calculatedImc < 18.50) {
      setClassification('Abaixo do peso')
    } else if (calculatedImc >= 18.50 && calculatedImc < 24.90) {
      setClassification('Peso normal')
    } else if(calculatedImc >= 25 && calculatedImc < 29.90){
      setClassification('Acima do peso (sobrepeso)')
    }else if (calculatedImc >= 30 && calculatedImc < 34.90) {
      setClassification('Obesidade I')
    } else if (calculatedImc >= 35 && calculatedImc < 39.90) {
      setClassification('Obesidade II')
    } else if (calculatedImc > 40) {
      setClassification('Obesidade III')
    }
    else {
      calculatedImc.toFixed(2)
    }
    setResultImc(calculatedImc.toFixed(2))
    setShowResult(true)
  }

  useEffect(() => {
    setShowWeightWarning(false)
    setShowHeightWarning(false)
    setShowResult(false)
  }, [quilograma, altura])


  return (
    <Container>
      <Icon source={require("../assets/fametroLogo.jpeg")} />
      <Text>Bem-vindo(a)</Text>
      <Text>Calcule seu IMC</Text>
      <Input
        value={quilograma}
        onChangeText={(quilograma) => { setQuilograma(quilograma) }}
        placeholder="Peso (kg)"
        placeholderTextColor="#121212"
        keyboardType="numeric"
      />
      {showWeightWarning && 
        <TextWarning style={{ color: "red" }}>Por favor, digite um valor válido para o peso.</TextWarning>
      }
      <Input
        value={altura}
        onChangeText={(altura) => { setAltura(altura) }}
        placeholder="Altura (cm)"
        placeholderTextColor="#121212"
        keyboardType="numeric"
      />
      {showHeightWarning && 
        <TextWarning style={{ color: "red" }}>Por favor, digite um valor válido para altua.</TextWarning>
      }

      <Button
        onPress={handleSubmit}>
        <ButtonText>Calcular</ButtonText>
      </Button>


      {quilograma && altura && shwoResult &&
        <>
          <ResultText>
            Classificação: {classification}
          </ResultText>
          <ResultText>Resultado: {resultImc}</ResultText>
          <DetailsText>{IMCMessages[classification]}</DetailsText>
        </>
      }
    </Container>
  );
}
