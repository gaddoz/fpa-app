"use client";

import { createTournamentOrganizerInvitation } from "@/next-server-functions/tournament-organizers/invitation/create-tournament-organizers-invitation-action";
import { useFormState } from "react-dom";
import UserProfileAutocomplete from "@/components/user-profile/auto-complete/user-profile-autocomplete";
import { useState } from "react";
import { Tables } from "@/utils/supabase/database.types";
import UserProfileDisplay from "@/components/user-profile/details/user-profile-display/user-profile-display";
import FormSubmitButton from "@/components/common/form-submit-button/form-submit-button";

type CreateTournamentOrganizerInvitationFormProps = {
  tournamentId: string;
};

export default function CreateTournamentOrganizerInvitationForm({
  tournamentId,
}: CreateTournamentOrganizerInvitationFormProps) {
  const [selectedUserProfile, setSelectedUserProfile] =
    useState<Tables<"userprofile"> | null>(null);

  const resetSelectedUserProfile = () => setSelectedUserProfile(null);

  const [state, dispatch] = useFormState(
    createTournamentOrganizerInvitation,
    {},
  );

  return (
    <form action={dispatch} style={{ border: "solid", padding: "1rem" }}>
      <h3>Invite Organizer</h3>
      <input hidden name="tournamentId" defaultValue={tournamentId} />
      <input
        hidden
        id="user-id-input"
        name="userId"
        defaultValue={selectedUserProfile?.id ?? ""}
      />
      {selectedUserProfile ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <UserProfileDisplay userProfile={selectedUserProfile} />
          <button type="button" onClick={resetSelectedUserProfile}>
            reset {"->"} 🗑️
          </button>
          <FormSubmitButton>Send invitation</FormSubmitButton>
        </div>
      ) : (
        <UserProfileAutocomplete
          onSelectUser={(userProfile) => {
            setSelectedUserProfile(userProfile);
          }}
        />
      )}
    </form>
  );
}
