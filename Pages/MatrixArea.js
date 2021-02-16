import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'

export const MatrixArea = () => {

  const [count, setCount] = useState([])
  const [allMatrix, setAllMatrix] = useState()
  const [allResult, setAllresult] = useState([])

  useEffect(() => {
    handleCount(2)
  }, [])

  const handleCount = (count) => {
    if (count < 0) return
    let arr = []
    let allColumns = []
    let firstRow = [0, 0, 0]
    allColumns.push(firstRow)
    allColumns.push(firstRow)
    allColumns.push(firstRow)
    let reallyAll = []

    for (let i = 0; i < count; i++) {
      arr.push(i)
      reallyAll.push(allColumns)
    }
    console.log(reallyAll)
    setAllMatrix(reallyAll)
    setCount(arr)
    setAllresult([])
  }

  const multiply = (a, b) => {
    const transpose = (a) => a[0].map((x, i) => a.map((y) => y[i]));
    const dotproduct = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
    const result = (a, b) => a.map((x) => transpose(b).map((y) => dotproduct(x, y)));
    return result(a, b);
  }

  const handleAllMatrix = (index, x, y, value) => {
    let currentAll = [...allMatrix]
    let matArr = []
    currentAll.map(matrix => {
      let cowArr = []
      matrix.map(column => {
        let rowArr = []
        column.map(row => {
          rowArr.push(row)
        })
        cowArr.push(rowArr)
      })
      matArr.push(cowArr)
    })
    matArr[index][x][y] = Number(value)
    setAllMatrix(matArr)
  }


  const handleCalculate = () => {
    console.log("here to calculate");
    let currentAll = [...allMatrix]
    let result;
    let resultArr = []
    for (let i = 0; i < count.length - 1; i++) {
      if (i == 0) {
        result = multiply(currentAll[0], currentAll[1]);
        console.log(result)
      }
      else {
        result = multiply(result, currentAll[i + 1])
      }
      resultArr.push(result)
    }
    console.log(resultArr)
    setAllresult(resultArr)
  }


  const showMatrix = (matrix) => {
    return (
      <View style={{ padding: 5, margin: 5, borderColor: "#ddd", borderStyle: "solid", borderWidth: 2, width: 120 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text style={{color:"tomato"}}>{Number(matrix[0][0]).toFixed(2)}</Text>
          <Text style={{color:"skyblue"}}>{Number(matrix[0][1]).toFixed(2)}</Text>
          <Text style={{color:"limegreen"}}>{Number(matrix[0][2]).toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text style={{color:"tomato"}}>{Number(matrix[1][0]).toFixed(2)}</Text>
          <Text style={{color:"skyblue"}}>{Number(matrix[1][1]).toFixed(2)}</Text>
          <Text style={{color:"limegreen"}}>{Number(matrix[1][2]).toFixed(2)}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text style={{color:"tomato"}}>{Number(matrix[2][0]).toFixed(2)}</Text>
          <Text style={{color:"skyblue"}}>{Number(matrix[2][1]).toFixed(2)}</Text>
          <Text style={{color:"limegreen"}}>{Number(matrix[2][2]).toFixed(2)}</Text>
        </View>
      </View>
    )
  }

  const showResult = (allResult) => {
    if (typeof allMatrix !== "undefined")
      for (let i = 0; i < allResult.length; i++) {
        if (i == 0) {
          return (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {showMatrix(allResult[i])}
              </View>
            </View>
          )
        }
      }

  }

  return (
    <View>
      <TextInput placeholder="Count" style={{ backgroundColor: "#ddd", textAlign: "center" }} onChangeText={text => handleCount(text)} />
      <Text style={{ margin: 5 }}>Count :{count.length}</Text>
      <ScrollView horizontal={true}>

        {count.map((value, i) => {
          return (
            <View style={{ borderStyle: "solid", borderColor: "#ddd", borderWidth: 3, padding: 5, margin: 5 }} key={i}>
              <Text style={{ textAlign: "center" }}>Matrix : {i + 1} </Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput placeholder="*" onChangeText={text => handleAllMatrix(i, 0, 0, text)} />
                <TextInput placeholder="*" onChangeText={text => handleAllMatrix(i, 0, 1, text)} />
                <TextInput placeholder="*" onChangeText={text => handleAllMatrix(i, 0, 2, text)} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <TextInput placeholder="*" onChangeText={text => handleAllMatrix(i, 1, 0, text)} />
                <TextInput placeholder="*" onChangeText={text => handleAllMatrix(i, 1, 1, text)} />
                <TextInput placeholder="*" onChangeText={text => handleAllMatrix(i, 1, 2, text)} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <TextInput placeholder="*" onChangeText={text => handleAllMatrix(i, 2, 0, text)} />
                <TextInput placeholder="*" onChangeText={text => handleAllMatrix(i, 2, 1, text)} />
                <TextInput placeholder="*" onChangeText={text => handleAllMatrix(i, 2, 2, text)} />
              </View>

            </View>
          )
        })
        }
      </ScrollView>
      <TouchableOpacity style={{ width: 80 }} onPress={() => handleCalculate()}><Text style={{ backgroundColor: "tomato", color: "white", padding: 6, fontSize: 14, borderRadius: 14, textAlign: "center", margin: 5 }}>Calculate</Text></TouchableOpacity>
      {
        allResult.map((res, i) => {
          if (i == 0) {
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }} key={i}>
                {showMatrix(allMatrix[0])}
                {showMatrix(allMatrix[1])}
                <Text>=</Text>
                {showMatrix(allResult[0])}
              </View>
            )
          } else {
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }} key={i}>
                {showMatrix(allResult[i - 1])}
                {showMatrix(allMatrix[i + 1])}
                <Text>=</Text>
                {showMatrix(allResult[i])}
              </View>
            )
          }

        })
      }
    </View>
  )
}