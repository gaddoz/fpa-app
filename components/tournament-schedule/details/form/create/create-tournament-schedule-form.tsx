"use client";

import { useFormState } from "react-dom";
import FormSubmitButton from "@/components/common/form-submit-button/form-submit-button";
import { createSchedule } from "@/next-server-functions/tournament-schedule/create-tournament-schedule-action";

export default function CreateScheduleForm({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const [state, dispatch] = useFormState(createSchedule, {});

  const errors = state.validationErrors;
  const displayErrors =
    errors && Object.keys(errors).length > 0 ? (
      <div className="text-red-500">
        {Object.entries(errors).map(([field, messages]) => (
          <div key={field}>
            {field}: {messages.join(", ")}
          </div>
        ))}
      </div>
    ) : null;

  return (
    <form action={dispatch} className="flex flex-col gap-2">
      <input name="tournament_id" required value={tournamentId} type="hidden" />
      <input name="place_id" value="" type="hidden" />
      <input name="lat" value="0" type="hidden" />
      <input name="lng" value="0" type="hidden" />
      <input name="full_address" value="" type="hidden" />
      <input name="description" placeholder="description" />
      <input name="start_time" required type="datetime-local" />
      <input name="end_time" required type="datetime-local" />
      <FormSubmitButton>Create Schedule entry</FormSubmitButton>
      {displayErrors}
    </form>
  );
}
