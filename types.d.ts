import { Duration } from "date-fns";

type User = {
    name: string;
    id: string;
    startDate?: string;
    endDate?: string;
    duration?: Duration;
}