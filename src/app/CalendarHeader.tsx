/** @format */

import { Box } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";

import { addMonths, formataMonth } from "./dateFunctions";

import { Link } from "react-router-dom";

interface ICalendarProps {
  month: string;
}

export default function CalenderHeader(props: ICalendarProps) {
  const { month } = props;
  return (
    <Box
      display="flex"
      borderBottom="2px solid rgb(224,224,224)"
      alignItems="center"
      padding="8px 16px"
    >
      <Box>
        <IconButton
          aria-label="Mês anterior"
          component={Link}
          to={"/calendar/" + addMonths(month, -1)}
        >
          <Icon>chevron_left</Icon>
        </IconButton>
        <IconButton
          aria-label="Proximo mês"
          component={Link}
          to={"/calendar/" + addMonths(month, 1)}
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </Box>

      <Box flex="1" marginLeft="16px" component="h3">
        {formataMonth(month)}
      </Box>
      <IconButton aria-label="Usúario ">
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
    </Box>
  );
}
