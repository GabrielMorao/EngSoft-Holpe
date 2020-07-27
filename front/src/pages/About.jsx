import React, { Fragment } from "react";

import { ThemedPaper } from "../design-system/components/Cards";
import { Grid, Typography } from "@material-ui/core";
import Footer from "../components/Footer"

import about_1 from "../assets/about_1.png";
import about_2 from "../assets/about_2.png";

const About = () => {
  return (
    <Fragment>
      <Grid container style={{height: "82vh"}} alignContent="center">
        <Grid item container alignItems="center" style={{height: "50%", padding: "16px"}}>
          <Grid item sm={1} />
          <Grid item sm={3}>
            <img src={about_1} alt="Girl helping a guy on wheelchair" style={{height: "35vh", width: "35vh"}} />
          </Grid>
          <Grid item container sm={8} alignContent="center" style={{height: "100%"}}>
            <ThemedPaper 
              name={"Quem somos?"}
              text={
                <Typography variant="h2">
                  Uma iniciativa para auxiliar na área de trabalhos voluntários formado por alunos do ICMC da USP e esta é uma proposta sem fins lucrativos. Caso tenha alguma dúvida, crítica, sugestão, ou queira apenas nos dar um oi, por favor, use o menu contato para falar com a gente :)
                  <br/><br/>
                  Seja você também um voluntário!
                </Typography>
              } 
            />
          </Grid>
        </Grid>
        <Grid item container style={{height: "50%", padding: "16px"}}>
          <Grid item container sm={8} alignConten="center" style={{height: "100%"}}>
            <ThemedPaper 
              name={"A Ideia"}
              text={
                <Typography variant="h2">
                  Visamos facilitar a conexão entre grupos ou ongs que precisam de ajuda para realizarem trabalho voluntário com pessoas em busca de oportunidades para isso. 
                  <br/>
                  Esperamos que esta iniciativa faça aumentar o número de voluntários nas mais variadas áreas e, com isso, ajudar tanto grupos ou ongs a preencher suas vagas, quanto pessoas interessadas em se voluntariar nas tarefas.
                </Typography>
              }
            />
          </Grid>
          <Grid item container sm={3} justify="flex-end">
            <img src={about_2} alt="Two people planting a sapling" style={{height: "35vh", width: "35vh"}} />
          </Grid>
          <Grid item sm={1} />
        </Grid>
      </Grid>
      <Footer />
    </Fragment>
  )
};

export default About;
